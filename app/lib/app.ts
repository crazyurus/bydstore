import { md5 } from '../../lib/encrypt';

export interface App {
  id: number;
  name: string;
  icon: string;
  version: string;
  introduction: string;
  download: string;
}

export interface FeaturedBanner {
  id: number;
  title: string;
  pictureUrl: string;
  app: App;
}

export interface FeaturedContent {
  banners: FeaturedBanner[];
  apps: App[];
}

interface AppDetail {
  updata_message: string;
  images: Array<{
    image_path: string;
  }>;
  appInfo: {
    classification_name: string;
    icon: string;
    version: string;
    download: string;
    size: number;
    name: string;
    package_name: string;
    introduction: string;
  };
  description: string;
  score: number;
  app_developer: string;
  permissions: Array<{
    permission_intro: string;
    permission_cn: string;
    permission_en: string;
  }>;
  privacy_policy: string;
  icp: string;
  sdk: string;
  add_time: number;
  download_counts: number;
  screen_compatibility: number;
}

interface FeaturedAdvertise {
  id: number;
  title: string;
  pictureUrl: string;
  pictureUrlH?: string | null;
  appInfos?: App[];
}

interface DiLinkRecommendCard {
  id: number;
  title: string;
  pictureUrl: string;
  appInfo?: App;
}

interface AppCategory {
  id: number;
  name: string;
  list?: App[];
}

interface ApiResponse<T> {
  code: number;
  data?: T;
}

const APP_UI_VERSION = '2.3.6';

function calcSignature(json: string): string {
  const source = process.env.APP_SIGNATURE_HEAD + json + process.env.APP_SIGNATURE_END;

  return md5(source);
}

async function request<T>(path: string, params: object): Promise<T> {
  const json = JSON.stringify(params);
  const response = await fetch(process.env.APP_STORE_URL! + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      sign: calcSignature(json)
    },
    body: json
  });

  if (!response.ok) {
    throw new Error(`App Store request failed: ${response.status}`);
  }

  const body = (await response.json()) as ApiResponse<T>;

  if (body.code !== 0 || body.data === undefined) {
    throw new Error(`App Store API returned code ${body.code}`);
  }

  return body.data;
}

export async function getList(category: string, platform: string): Promise<App[]> {
  const params = {
    category,
    limit: '50',
    offset: '0',
    token: process.env[`JWT_TOKEN_${platform}`]!,
    vehicle: '1'
  };

  return request<App[]>('/category/softwares', params);
}

export async function getAllApps(platform: string): Promise<App[]> {
  const categories = await request<AppCategory[]>('/category/softwaresall', {
    vehicle: '1',
    token: process.env[`JWT_TOKEN_${platform}`]!
  });
  const apps = new Map<number, App>();
  const maxCategorySize = Math.max(0, ...categories.map(item => item.list?.length || 0));

  // Round-robin categories so recommendations are not dominated by one type.
  for (let index = 0; index < maxCategorySize; index++) {
    for (const category of categories) {
      const app = category.list?.[index];

      if (app) {
        apps.set(app.id, app);
      }
    }
  }

  return [...apps.values()];
}

export async function getFeaturedContent(platform: string): Promise<FeaturedContent> {
  const params = {
    token: process.env[`JWT_TOKEN_${platform}`]!,
    uiVersion: APP_UI_VERSION
  };
  const [advertiseResult, recommendResult] = await Promise.allSettled([
    request<FeaturedAdvertise[]>('/featured/advertise/get', params),
    request<DiLinkRecommendCard[]>('/diLink/recommend/get', params)
  ]);
  const advertises = advertiseResult.status === 'fulfilled' ? advertiseResult.value : [];
  const recommendations = recommendResult.status === 'fulfilled' ? recommendResult.value || [] : [];
  const advertiseBanners = advertises.flatMap<FeaturedBanner>(item => {
    const app = item.appInfos?.[0];

    return app && item.pictureUrl
      ? [
          {
            id: item.id,
            title: item.title,
            pictureUrl: item.pictureUrlH || item.pictureUrl,
            app
          }
        ]
      : [];
  });
  const banners = advertiseBanners.length
    ? advertiseBanners
    : recommendations.flatMap<FeaturedBanner>(item =>
        item.appInfo && item.pictureUrl
          ? [
              {
                id: item.id,
                title: item.title,
                pictureUrl: item.pictureUrl,
                app: item.appInfo
              }
            ]
          : []
      );
  const apps = new Map<number, App>();

  for (const item of recommendations) {
    if (item.appInfo) {
      apps.set(item.appInfo.id, item.appInfo);
    }
  }

  for (const item of advertises) {
    for (const app of item.appInfos || []) {
      apps.set(app.id, app);
    }
  }

  return {
    banners,
    apps: [...apps.values()]
  };
}

export async function getDetail(id: string): Promise<AppDetail> {
  const params = {
    software: id,
    token: process.env[`JWT_TOKEN_5`]!,
    vehicle: '1'
  };

  return request<AppDetail>('/software/detailWithSix', params);
}

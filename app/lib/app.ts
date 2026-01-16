import crypto from 'node:crypto';

interface App {
  id: number;
  name: string;
  icon: string;
  version: string;
  introduction: string;
  download: string;
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

function calcSignature(json: string): string {
  const source = process.env.SIGNATURE_HEAD + json + process.env.SIGNATURE_END;

  return crypto.createHash('md5').update(source, 'utf8').digest('hex');
}

export async function getList(category: string, platform: string): Promise<App[]> {
  const params = {
    category,
    limit: '50',
    offset: '0',
    token: process.env[`JWT_TOKEN_${platform}`]!,
    vehicle: '1'
  };
  const json = JSON.stringify(params);
  const response = await fetch(process.env.APP_STORE_URL! + '/category/softwares', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      sign: calcSignature(json)
    },
    body: json
  });
  const body = await response.json();

  return body.data;
}

export async function getDetail(id: string): Promise<AppDetail> {
  const params = {
    software: id,
    token: process.env[`JWT_TOKEN_5`]!,
    vehicle: '1'
  };
  const json = JSON.stringify(params);
  const response = await fetch(process.env.APP_STORE_URL! + '/software/detailWithSix', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      sign: calcSignature(json)
    },
    body: json
  });
  const body = await response.json();

  return body.data;
}

import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

import { md5 } from '../../lib/encrypt';

interface Theme {
  rsId: number;
  rsName: string;
  rsFlag: string;
  rsType: string;
  fileUrl: string;
  landCover: string;
  portCover: string;
  totalLoad: number;
  totalLike: number;
  price: number;
}

function encrypt(text: string, keyStr: string): string {
  const keyHash = crypto.createHash('sha256').update(keyStr).digest();
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv('aes-256-cbc', keyHash, iv);
  cipher.setAutoPadding(true);
  let encrypted = cipher.update(text, 'utf8', 'hex');

  encrypted += cipher.final('hex');

  return encrypted;
}

function decrypt(hexStr: string, keyStr: string): string {
  const keyHash = crypto.createHash('sha256').update(keyStr).digest();
  const iv = Buffer.alloc(16, 0);
  const encryptedText = Buffer.from(hexStr, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', keyHash, iv);
  decipher.setAutoPadding(true);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString('utf8');
}

function getPlatformParameters(platform: string): {
  vType: string;
  pType: string;
  vin: string;
} {
  const jwtToken = process.env[`JWT_TOKEN_${platform}`]!;
  const decodeData = jwt.decode(jwtToken) as { sub: string };
  const payload = JSON.parse(decodeData.sub);

  return {
    vType: payload.vt.toString(),
    pType: payload.platform,
    vin: payload.vin
  };
}

export async function getList(type: 'theme' | 'wallpaper', platform: string): Promise<Theme[]> {
  const rsFlag = type === 'theme' ? '1' : '2';
  const parameters = getPlatformParameters(platform);
  const businessData = { ...parameters, rsFlag };
  const businessJson = JSON.stringify(businessData);
  const encryptKey = process.env.THEME_ENCRYPT_KEY!;
  const baseParam = {
    userName: 'Cr4zy Uru5',
    enCodeData: encrypt(businessJson, encryptKey),
    sign: md5(businessJson),
    uuid: crypto.randomUUID()
  };

  const response = await fetch(`${process.env.THEME_STORE_URL}/getAppPopularInfo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(baseParam)
  });
  const responseJson = await response.json();

  if (responseJson.resultData && typeof responseJson.resultData === 'string') {
    const decryptedData = decrypt(responseJson.resultData, encryptKey);

    if (decryptedData) {
      const resultList = JSON.parse(decryptedData);
      if (Array.isArray(resultList)) {
        return resultList;
      } else {
        return [];
      }
    }
  }

  return [];
}

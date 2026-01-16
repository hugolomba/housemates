import crypto from "crypto";

const algorithm = "aes-256-gcm";

function getKey() {
  const secret = process.env.CREDENTIAL_SECRET;
  if (!secret) {
    throw new Error("CREDENTIAL_SECRET is not set");
  }
  return Buffer.from(secret, "hex");
}

export function encrypt(text: string) {
  const iv = crypto.randomBytes(12);
  const key = getKey();
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();

  return JSON.stringify({
    content: encrypted.toString("hex"),
    iv: iv.toString("hex"),
    tag: tag.toString("hex"),
  });
}

export function decrypt(encryptedJson: string) {
  const { content, iv, tag } = JSON.parse(encryptedJson);
  const key = getKey();

  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(iv, "hex")
  );

  decipher.setAuthTag(Buffer.from(tag, "hex"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(content, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}

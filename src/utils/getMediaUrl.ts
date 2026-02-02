// utils/getMediaUrl.ts
export const getMediaUrl = (path?: string | null) => {
  if (!path) return null;

  if (path.startsWith("http")) return path;

  return `http://localhost:5000${path}`;
};

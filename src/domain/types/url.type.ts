export interface IUrl {
     _id: string,
     originalUrl: string,
     shortCode: string,
     userId: string,
     createdAt: Date,
}

export interface UrlResponseDto {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
}

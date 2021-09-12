export const authParam: HeadersInit = {
  Authorization:
    "Basic " +
    Buffer.from(
      `${process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME}:${process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD}`
    ).toString("base64"),
};

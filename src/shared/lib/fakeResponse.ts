export function getFakeResponse<T>(data: T = {} as T) {
  const type: ResponseType = 'default';

  return {
    data,
    error: undefined,
    headers: {} as Headers,
    ok: false,
    redirected: false,
    status: 0,
    statusText: '',
    type,
    url: '',
    clone(): Response {
      throw new Error('Function not implemented.');
    },
    body: null,
    bodyUsed: false,
    arrayBuffer(): Promise<ArrayBuffer> {
      throw new Error('Function not implemented.');
    },
    blob(): Promise<Blob> {
      throw new Error('Function not implemented.');
    },
    bytes(): Promise<Uint8Array> {
      throw new Error('Function not implemented.');
    },
    formData(): Promise<FormData> {
      throw new Error('Function not implemented.');
    },
    json(): Promise<unknown> {
      throw new Error('Function not implemented.');
    },
    text(): Promise<string> {
      throw new Error('Function not implemented.');
    },
  };
}

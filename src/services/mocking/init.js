// eslint-disable-next-line import/prefer-default-export
export async function initMockingService() {
  const { worker, rest } = await import('./browser');

  window.entando.mockingService = {
    setMock: worker.use,
    restClient: rest,
  };

  return worker.start();
}

import { VicadccPage } from './app.po';

describe('vicadcc App', () => {
  let page: VicadccPage;

  beforeEach(() => {
    page = new VicadccPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

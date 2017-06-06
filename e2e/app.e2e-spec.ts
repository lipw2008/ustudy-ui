import { UstudyUiPage } from './app.po';

describe('ustudy-ui App', () => {
  let page: UstudyUiPage;

  beforeEach(() => {
    page = new UstudyUiPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});

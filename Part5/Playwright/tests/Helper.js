const LoginHelper = async (page, user, pw) => {
  await page.getByPlaceholder("Username").fill(user);
  await page.getByPlaceholder("Your Password").fill(pw);
  await page.getByText("Login").click();
};

const createPost = async (page,title,author,URL) => {
  await page.getByText("Create New Post").click();
  await page.getByPlaceholder("Title").fill(title);
  await page.getByPlaceholder("Author").fill(author);
  await page.getByPlaceholder("URL").fill(URL);
  await page.getByText("Add Blog Post").click();
  await page.getByText(title).waitFor("attached");
};

export { LoginHelper, createPost };

import { HomePage, NotFoundPage, PostsPage, PostPage, TagsPage } from './pages';
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/posts' exact>
          <PostsPage />
        </Route>
        <Route path='/posts/edit/:id'>
          <PostPage />
        </Route>
        <Route path='/posts/create'>
          <PostPage />
        </Route>
        <Route path='/tags'>
          <TagsPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

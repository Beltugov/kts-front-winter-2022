import ReposPage from "./pages/RepoPage/ReposPage";
import ReposSearchPage from "./pages/RepoSearchPage/ReposSearchPage";

export const REPOS_ROUTE = "/repos";

export const routes = [
  {
    path: REPOS_ROUTE,
    Component: ReposSearchPage,
  },
  {
    path: REPOS_ROUTE + "/:name",
    Component: ReposPage,
  },
];

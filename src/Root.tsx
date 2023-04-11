/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ThemeProvider } from '@mui/material';
import React from 'react';

import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from 'react-router-dom';

import { RGBeats } from './screens/RGBeats';
import { PlaylistPage } from './screens/PlaylistPage';
import { ScreenMain } from './styling/commonStyles';
import { lightTheme } from './styling/themes';

type ScrollToTopProps = {
  children: JSX.Element;
};

function ScrollToTop(props: ScrollToTopProps) {
  const history = useHistory();
  React.useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo({
        top: 0,
        left: 0,
      });
    });
    return unlisten;
  }, [history]);

  return <React.Fragment>{props.children}</React.Fragment>;
}

function Root(): JSX.Element {
  const Helper = (props: any) => {
    return <PlaylistPage playlistId={props.match.params.id} />;
  };

  return (
    <>
      <Router>
        <ScrollToTop>
          <ThemeProvider theme={lightTheme}>
            <ScreenMain>
              <Switch>
                <Route path="/playlist/:id">
                  {Helper}
                </Route>
                <Route path="/">
                  <RGBeats />
                </Route>
                <Route path="*">
                  <Redirect to="/" />
                </Route>
              </Switch>
            </ScreenMain>
          </ThemeProvider>
        </ScrollToTop>
      </Router>
    </>
  );
}

export { Root };

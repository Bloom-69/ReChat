import {
  Button,
  Card,
  CardMedia,
  CircularProgress,
  FormControl,
  Grid,
  ListItem,
  Paper,
  TextField,
} from "@suid/material";
import type { Accessor, Component, Setter } from "solid-js";
import { createEffect, createSignal, For } from "solid-js";
import { gbClient } from "../../../../lib/gifbox";

const [loading, setLoading] = createSignal<boolean>(true);
const [error, setError] = createSignal<string>("");
const [token, setToken] = createSignal<string>("");
const [loggedIn, setLoggedIn] = createSignal<boolean>(false);
const [gifs, setGifs] = createSignal<any[]>();
const [query, setQuery] = createSignal<string>("");

interface props {
  message: Accessor<string>;
  setMessage: Setter<string>;
}

async function requestPopularGifs() {
  try {
    setLoading(true);
    const gifArray = await gbClient.post.popularPosts(50, 0).catch((e) => {
      throw e;
    });
    if (gifArray) return gifArray;
  } catch (e) {
    setError(e as string);
  } finally {
    setLoading(false);
  }
}

async function loginToGifbox() {
  try {
    if (token()) {
      gbClient
        .loginBearer(token())
        .catch((e) => {
          throw e;
        });
    } else {
      throw "You need to provide an Token :/";
    }
  } catch (e) {
    setError(e as string);
  } finally {
    setLoggedIn(true);
  }
}

async function searchGB() {
  try {
    await gbClient.post
      .searchPosts(query(), 100, 0)
      .then((e) => {
        setGifs(e.hits);
      })
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    setError(e as string);
  }
}

export const GifTab: Component<props> = (props) => {
  function addToText(s: string) {
    props.setMessage(props.message() + s);
  }

  createEffect(async () => {
    if (loggedIn()) {
      await requestPopularGifs().then((e) => {
        setGifs(e as any);
      });
    }
  }, [props]);

  return (
    <>
      {loggedIn()
        ? (
          <div class="solenoid-picker-grid gifbox">
            <FormControl>
              <TextField
                role="searchbox"
                placeholder="Browse GIFBox"
                value={query()}
                onChange={(e) => setQuery(e.currentTarget.value)}
              />
              <Button onClick={searchGB}>Search</Button>
            </FormControl>
            {loading()
              ? (
                <Paper
                  sx={{ width: "auto", height: "auto", borderRadius: "999" }}
                >
                  <CircularProgress />
                </Paper>
              )
              : (
                <For each={gifs()}>
                  {(gif) => {
                    console.log(gif);
                    return (
                      <Grid container>
                        <Grid item>
                          <Card
                            onClick={() =>
                              addToText(
                                `[](https://api.gifbox.me/file/posts/${gif.file.fileName})`,
                              )}
                          >
                            <CardMedia
                              component="img"
                              src={`https://api.gifbox.me/file/posts/${gif.file.fileName}`}
                            />
                          </Card>
                        </Grid>
                      </Grid>
                    );
                  }}
                </For>
              )}
            {gifs()!.length < 0 && <p>{error()}</p>}
          </div>
        )
        : (
          <ListItem>
            <TextField
              value={token() ?? ""}
              onChange={(e) => setToken(e.currentTarget.value)}
              label="Gifbox Token"
            />
            <Button onClick={loginToGifbox}>Login</Button>
          </ListItem>
        )}
    </>
  );
};

export default GifTab;

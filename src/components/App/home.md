## dokku

Have konsumer add your pubkey.

Afterwards, you will be able to issue dokku commands, like this:

```sh
ssh dokku@dev.jetboystudio.com help
```

To make new container, you can use a heroku buildpack or any Dockerfile, and push it to the server, like this:

```sh
git remote add dev dokku@dev.jetboystudio.com:DROPLET_NAME
git push --set-upstream dev master
```

Then, you can push to it like this:

```sh
git push
```

And you can get to it at `http://DROPLET_NAME.jetboystudio.com`

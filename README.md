# my-blog

cd client yarn start

in another tab

node server.js

```
//Add a Rule in your Auth0 similar to the following
function (user, context, callback) {
  if(user.email === "<your-email>"){
    context.accessToken.scope = ["openid", "profile", "read:blog", "write:blog"];
  } else {
     context.accessToken.scope = ["openid", "profile", "read:blog"]; 
  }
  callback(null, user, context);
}
```

# Netlify Contact Form

This is a serverless solution for a contact form that gathers up the form fields on form submition and is then sent to a single email address all using lambda functions.

## Info

This example uses webpack to bundle up the javascript, tailwind for styles, eleventy to build the html, netlify dev and netlify lambda to build and serve local environment functions. Client side validation via the form web api and server side validation with Joi.

`yarn start` kicks off the development environment

- this runs `netlify dev` - uses netlify.toml to override defaults
  - the default port to listen to is overwritten to use the custom browsersync port
  - the default eleventy build detector is overwritten with a custom npm script - `yarn run dev`
- the custom dev script builds assets, functions, and 11ty in parallel then runs a browsersync server and watches all files (in parallel)

## Resources

Chris Ferdinandi's 2017 series of on Form Validation using the native Web APIs at CSS Tricks [Constraint Validation in HTML](https://css-tricks.com/form-validation-part-1-constraint-validation-html/).

David Wells' [repo](https://github.com/netlify-labs/progressive-form-enhancement-via-functions) and accompanying [video](https://www.youtube.com/watch?v=Abrd2dAY1Dc) on Progressive Form Enhancements with Netlify Lambda functions.

Kent C. Dodds' [video](https://www.youtube.com/watch?v=uS4fZZ94J84) on moving his contact form from Netlify Forms to Netlify Functions

[Handle Forms Like A Boss](https://time2hack.com/2018/06/formdata-api-handle-forms-like-a-boss/)

module.exports = function(eleventyConfig) {
  return {
    dir: {
      input: 'src',
      layouts: "_layouts"
    },
    htmlTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"]
  };
};

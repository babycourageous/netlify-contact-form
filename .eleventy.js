module.exports = function(eleventyConfig) {
  return {
    dir: {
      layouts: "_layouts"
    },
    htmlTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"]
  };
};

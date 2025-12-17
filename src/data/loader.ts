import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";

import qs from "qs";

const allBlogsQuery = () =>
  qs.stringify(
    {
      populate: {
        image: {
          fields: ["url", "name"],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

export async function getBlogs() {
  const path = "/api/blogs";
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);

  url.search = allBlogsQuery();
  return await fetchAPI(url.href, { method: "GET" });
}

const blogBySlugQuery = (slug: string) =>
  qs.stringify(
    {
      filters: { slug: { $eq: slug } },
      populate: {
        image: {
          fields: ["url", "name"],
        },
      },
      pagination: { pageSize: 1 },
    },
    { encodeValuesOnly: true }
  );

export async function getBlogBySlug(slug: string) {
  const path = "/api/blogs";
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);

  url.search = blogBySlugQuery(slug);
  return await fetchAPI(url.href, { method: "GET" });
}

const projectQuery = () =>
  qs.stringify({
    sort: ["createdAt:desc"],
    populate: {
      image: {
        fields: ["url", "name"],
      },
    },
  });

export async function getProject() {
  const path = "/api/projects";
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);

  url.search = projectQuery();

  return await fetchAPI(url.href, {
    method: "GET",
    next: { revalidate: 3600 },
  });
}

const homepageQuery = () =>
  qs.stringify({
    populate: {
      blocks: {
        on: {
          "blocks.hero-section": {
            populate: {
              video: {
                fields: ["url", "name"],
              },
            },
          },
          "homepage.spectrum": {
            populate: {
              link: true,
              right_block: true,
            },
          },
          "homepage.service": {
            populate: {
              cards: {
                populate: {
                  image: {
                    fields: ["url", "name"],
                  },
                  link: true,
                },
              },
            },
          },
          "homepage.other-services": {
            populate: {
              link: true,
              cards: {
                populate: {
                  link: true,
                },
              },
            },
          },
          "homepage.ready-to-get-started": {
            populate: {
              quote: true,
              call: true,
            },
          },
          "homepage.testimonials": {
            populate: {
              testimonials: {
                populate: {
                  image: {
                    fields: ["url", "name"],
                  },
                },
              },
            },
          },
          "homepage.collaborations": {
            populate: {
              numbers: true,
              brands: {
                fields: ["url", "name"],
              },
            },
          },
        },
      },
    },
  });

export async function getHomepageQuery() {
  const path = "/api/homepage";
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);

  url.search = homepageQuery();
  return await fetchAPI(url.href, { method: "GET" });
}

const globalQuery = qs.stringify({
  populate: {
    header: {
      populate: {
        logo: {
          fields: ["url", "name"],
        },
        link: true,
        cta: true,
      },
    },
    cta: {
      populate: {
        card: true,
      },
    },
    footer: {
      populate: {
        socials: true,
        services: true,
        company: true,
        workWith: true,
        loop: true,
      },
    },
  },
});

export async function getGlobalData() {
  const path = "/api/global";
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);

  url.search = globalQuery;
  return await fetchAPI(url.href, { method: "GET" });
}

const pageBySlugQuery = (slug: string) =>
  qs.stringify({
    filters: {
      slug: {
        $eq: `${slug}`,
      },
    },
    populate: {
      blocks: {
        on: {
          "blocks.service": {
            populate: {
              services: {
                populate: {
                  image: {
                    fields: ["url", "name"],
                  },
                  subServices: {
                    populate: {
                      image: {
                        fields: ["url", "name"],
                      },
                    },
                  },
                },
              },
              herosection: {
                populate: {
                  video: {
                    fields: ["url", "name"],
                  },
                },
              },
            },
          },
          "blocks.about-us": {
            populate: {
              herosection: {
                populate: {
                  video: {
                    fields: ["url", "name"],
                  },
                },
              },
              mission: true,
              vision: true,
              ourStory: true,
              highlights: {
                populate: {
                  image: {
                    fields: ["url", "name"],
                  },
                },
              },
              features: {
                populate: {
                  cards: {
                    populate: {
                      image: {
                        fields: ["url", "name"],
                      },
                    },
                  },
                },
              },
              members: {
                populate: {
                  image: {
                    fields: ["url", "name"],
                  },
                  skills: true,
                },
              },
            },
          },
          "blocks.careers": {
            populate: {
              herosection: {
                populate: {
                  video: {
                    fields: ["url", "name"],
                  },
                  tags: true,
                },
              },
              culture: {
                populate: {
                  cards: {
                    populate: {
                      image: {
                        fields: ["url", "name"],
                      },
                    },
                  },
                },
              },
              internship: {
                populate: {
                  jobs: {
                    populate: {
                      tags: true,
                    },
                  },
                },
              },
              gain: {
                populate: {
                  cards: {
                    populate: {
                      image: {
                        fields: ["url", "name"],
                      },
                    },
                  },
                },
              },
              apply: {
                populate: {
                  cards: {
                    populate: {
                      image: {
                        fields: ["url", "name"],
                      },
                    },
                  },
                },
              },
            },
          },
          "blocks.film": {
            populate: {
              herosection: {
                populate: {
                  video: {
                    fields: ["url", "name"],
                  },
                },
              },
              services: {
                populate: {
                  image: {
                    fields: ["url", "name"],
                  },
                },
              },
            },
          },
        },
      },
    },
  });

export async function getPageBySlug(slug: string) {
  const path = "/api/pages";
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);
  url.search = pageBySlugQuery(slug);
  return await fetchAPI(url.href, {
    method: "GET",
    next: { revalidate: 3600 },
  });
}

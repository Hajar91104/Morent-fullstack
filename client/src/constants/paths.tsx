export const paths = {
  HOME: "/",
  LIST: "/list",
  DETAIL: (id = ":id") => `/detail/${id}`,
  PAYMENT: (id = ":id") => `/payment/${id}`,
  DASHBOARD: {
    MAIN: "/dashboard",
    RENTS: {
      LIST: "/dashboard/rents",
      CREATE: "/dashboard/rents/create",
      EDIT: (id = ":id") => `/dashboard/rent/edit/${id}`,
    },
  },
};

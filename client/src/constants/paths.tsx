export const paths = {
  HOME: "/",
  LIST: "/list",
  DETAIL: (id = ":id") => `/detail/${id}`,
  PAYMENT: "/payment",
  DASHBOARD: {
    MAIN: "/dashboard",
    RENTS: {
      LIST: "/dashboard/rents",
      CREATE: "/dashboard/rents/create",
      DETAIL: (id = ":id") => `/dashboard/rent/${id}`,
    },
  },
};

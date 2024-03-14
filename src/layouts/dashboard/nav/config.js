// component
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("ic_user"),
  },
  {
    title: "Appointments",
    path: "/dashboard/links",
    icon: icon("ic_blog"),
  },
  // {
  //   title: "user",
  //   path: "/dashboard/user",
  //   icon: icon("ic_user"),
  // },
];

export default navConfig;

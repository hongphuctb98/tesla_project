import swal from "sweetalert";

export const handleAlert = (title: string, text: string, icon: string) => {
  return Promise.resolve(
    swal({
      title,
      text,
      icon,
    })
  );
};

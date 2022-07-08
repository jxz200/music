interface IRightsList {
  authName: string;
  path: string;
  id: number;
}
const permission = (el: HTMLElement, binding: any) => {
  const permission: string = binding.value.permission;
  const rightsList: Array<IRightsList> = binding.value.route.meta.rights;
  if (rightsList.every((item) => item.authName !== permission)) el.parentNode!.removeChild(el);
};

export default permission;

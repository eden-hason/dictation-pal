import {
  Navbar as _Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';

const Navbar = ({}) => {
  return (
    <_Navbar className="bg-slate-50">
      <NavbarBrand as={Link} href="/">
        <p className="font-bold text-black">
          Dictation <span className="text-purple-400">Pal</span>
        </p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} size="sm" color="primary" href="#" variant="flat">
            הרשמה
          </Button>
        </NavbarItem>
      </NavbarContent>
    </_Navbar>
  );
};

export default Navbar;

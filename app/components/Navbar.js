import { Navbar as _Navbar, NavbarBrand, Link, Chip } from '@nextui-org/react';

const Navbar = ({}) => {
  return (
    <_Navbar className="bg-slate-50">
      <NavbarBrand as={Link} href="/">
        <div className="flex items-center">
          <Chip
            className="ml-1 text-xs h-4"
            color="primary"
            size="sm"
            variant="flat">
            Beta
          </Chip>
          <p className="font-bold text-black">
            Dictation <span className="text-purple-400">Pal</span>
          </p>
        </div>
      </NavbarBrand>

      {/* <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} size="sm" color="primary" href="#" variant="flat">
            הרשמה
          </Button>
        </NavbarItem>
      </NavbarContent> */}
    </_Navbar>
  );
};

export default Navbar;

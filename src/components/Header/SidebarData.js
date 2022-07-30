import { HomeFilled, BellFilled, UserOutlined, UserAddOutlined, LogoutOutlined } from "@ant-design/icons";

export const SidebarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <HomeFilled />,
        cName: 'nav-text'
    },
    {
        title: 'News',
        path: '/news',
        icon: <BellFilled />,
        cName: 'nav-text'
    },
    {
        title: 'Login',
        path: '/login',
        icon: <UserOutlined />,
        cName: 'nav-text'
    },
    {
        title: 'Register',
        path: '/register',
        icon: <UserAddOutlined />,
        cName: 'nav-text'
    }

] 

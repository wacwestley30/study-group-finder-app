import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ links }) {
    const location = useLocation();

    return (
        <>
            {links.map((link) => {
            const { to, children } = link.props;
            const isActive = to === location.pathname;
            const className = isActive ? 'navbar-item is-active' : 'navbar-item';
            return (
                <Link key={to} className={className} to={to}>
                {children}
                </Link>
            );
            })}
        </>
    );
}
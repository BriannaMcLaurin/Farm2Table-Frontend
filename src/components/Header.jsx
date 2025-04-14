import NotificationBell from '../components/NotificationBell';

function Header() {
  return (
    <div className="top-bar">
      <div className="profile">
        🍔 Sam’s Farm ⏷
      </div>
      <NotificationBell userId="sam123" />
    </div>
  );
}


export default Header;
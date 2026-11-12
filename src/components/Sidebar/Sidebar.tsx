import "./Sidebar.css";
import {
  Book,
  BookMarked,
  BookOpenText,
  ChevronLeft,
  ChevronRight,
  Trash,
} from "lucide-react";
import { useState } from "react";
import logoSecundaria from "./../../assets/logo-secundaria.svg";
import { Link } from "react-router-dom";

interface SidebarProps {
  chats: Chat[];
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
}

export function Sidebar({
  chats,
  onNewChat,
  onSelectChat,
  onDeleteChat,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (isCollapsed) {
    return (
      <div className="sidebar-collapsed">
        <div className="arrow-right" onClick={toggleSidebar}>
          <ChevronRight />
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="menu-header">
        <Link to="/">
          <img src={logoSecundaria} alt="Home" />
        </Link>
        <div className="arrow-left" onClick={toggleSidebar}>
          <ChevronLeft />
        </div>
      </div>

      <div className="read-page-button-container">
        <Link className="read-button" to="/leitura">
          <BookMarked className="book-icon" size={"24px"} /> Leitura Essencial
        </Link>
      </div>

      <div className="read-page-button-container">
        <Link className="read-button" to="/escrita">
          <BookOpenText className="book-icon" size={"24px"} /> Escrita Acadêmica
        </Link>
      </div>

      <p className="recents">Recentes:</p>

      <div className="menu">
        {chats.map((chat) => (
          <button
            key={chat.id}
            className="old-page"
            onClick={() => onSelectChat(chat.id)}
          >
            {chat.title}
            <Trash
              className="trash-icon"
              size="20px"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(chat.id);
              }}
            />
          </button>
        ))}
      </div>

      <div className="new-page-button-container">
        <button className="new-page-button" onClick={onNewChat}>
          Nova Página
        </button>
      </div>
    </div>
  );
}

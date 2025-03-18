import { useState, useRef, useEffect } from 'react';
import { Bell, X, Settings } from 'lucide-react';

const NotificationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  // Cierra el panel cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target) && 
          !event.target.closest('.notification-bell')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Datos de ejemplo para las notificaciones
  const notifications = [
    {
      id: 1,
      type: 'sync',
      icon: 'V.',
      message: 'Your activity data synced to your',
      target: 'Garmin Training (Mar 17th)',
      time: '2 hours ago',
      isNew: true
    },
    {
      id: 2,
      type: 'sync',
      icon: 'V.',
      message: 'Your activity data synced to your',
      target: 'Track Session (Mar 17th)',
      time: '3 hours ago',
      isNew: true
    },
    {
      id: 3,
      type: 'update',
      icon: 'HC',
      message: 'Your coach updated your calendar:',
      items: [
        'added a Track Session (Mar 17th)',
        'added an Easy Run (Mar 18th)',
        'added a Day Off (Mar 19th)',
        'added a Quality Session (Mar 20th)',
        'and 3 more updates'
      ],
      time: 'Yesterday',
      isNew: true
    },
    {
      id: 4,
      type: 'sync',
      icon: 'V.',
      message: 'Your activity data synced to your',
      target: 'Long Run Session (Mar 15th)',
      time: '2 days ago',
      isNew: false
    }
  ];

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Botón de campana */}
      <button 
        className="notification-bell p-2 rounded-full text-gray-300 hover:bg-gray-700 focus:outline-none"
        onClick={togglePanel}
      >
        <Bell size={24} />
      </button>

      {/* Panel de notificaciones */}
      {isOpen && (
        <div 
          ref={panelRef}
          className="absolute right-0 mt-2 w-80 sm:w-96 bg-zinc-800/60 backdrop-blur-lg border border-zinc-100/10 rounded-lg shadow-lg z-50 transition-all duration-300 transform origin-top-right"
          style={{
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          {/* Encabezado del panel */}
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-gray-100">Notifications</h2>
            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-gray-200 focus:outline-none">
                <Settings size={18} />
              </button>
              <button 
                className="text-gray-400 hover:text-gray-200 focus:outline-none"
                onClick={() => setIsOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Marcar todas como leídas */}
          <div className="flex justify-end px-4 py-2">
            <button className="text-sm text-sky-400 hover:text-sky-300 cursor-pointer">
              Mark all as read
            </button>
          </div>

          {/* Lista de notificaciones */}
          <div className="space-y-1">
            {notifications.map((notification) => (
              <div key={notification.id} className="px-4 py-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0">
                <div className="flex items-start">
                  {/* Icono */}
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-gray-200">
                      {notification.icon}
                    </div>
                  </div>
                  
                  {/* Contenido */}
                  <div className="flex-1">
                    <div className="text-sm text-gray-300">
                      {notification.message} <span className="font-semibold text-gray-100">{notification.target}</span>
                      {notification.type === 'update' && (
                        <ul className="mt-2 list-disc pl-5 space-y-1">
                          {notification.items.map((item, idx) => (
                            <li key={idx} className="text-sm">
                              {item.includes('added') && (
                                <>
                                  {item.split('added a')[0]}added a <span className="font-semibold">{item.split('added a')[1]}</span>
                                </>
                              )}
                              {item.includes('added an') && (
                                <>
                                  {item.split('added an')[0]}added an <span className="font-semibold">{item.split('added an')[1]}</span>
                                </>
                              )}
                              {!item.includes('added') && item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    
                    {/* Tiempo */}
                    <p className="mt-1 text-xs text-gray-400">{notification.time}</p>
                  </div>
                  
                  {/* Indicador de nueva notificación */}
                  {notification.isNew && (
                    <div className="ml-3 w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
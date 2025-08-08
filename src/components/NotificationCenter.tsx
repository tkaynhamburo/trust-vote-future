import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Clock,
  X,
  Copy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  municipality: string;
  ward?: string;
  transactionId?: string;
  read: boolean;
}

interface NotificationCenterProps {
  municipality: string;
  ward: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "alert",
    title: "Water Outage Alert",
    message: "Planned water maintenance in your area from 9 AM to 3 PM. Store water in advance. SMS updates: *134*WATER#",
    timestamp: "2 hours ago",
    municipality: "City of Cape Town",
    ward: "Ward 23 - Langa, Bonteheuwel",
    read: false
  },
  {
    id: "2", 
    type: "success",
    title: "Vote Confirmed - Housing Project",
    message: "Your vote for Social Housing Development has been recorded on blockchain.",
    timestamp: "5 hours ago",
    municipality: "City of Cape Town", 
    ward: "Ward 23 - Langa, Bonteheuwel",
    transactionId: "0x742d35cc6dd37e032b9c8a5fccae8f13c5a8b890c8d18a73e1e2c5a3b8e9f123",
    read: false
  },
  {
    id: "3",
    type: "info", 
    title: "New Municipal Poll Available",
    message: "Essential Services Improvement vote is now open. Deadline: 7 days. Impact: R8 Million budget allocation.",
    timestamp: "1 day ago",
    municipality: "City of Cape Town",
    ward: "Ward 26 - Khayelitsha Site B",
    read: true
  },
  {
    id: "4",
    type: "warning",
    title: "Load Shedding Schedule Update",
    message: "Stage 2 load shedding from 6 PM to 10 PM. Check Eskom app for updates. Backup power at community center available.",
    timestamp: "2 days ago", 
    municipality: "City of Cape Town",
    read: true
  }
];

export const NotificationCenter = ({ municipality, ward }: NotificationCenterProps) => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const { toast } = useToast();

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning': return <Clock className="w-4 h-4 text-warning" />;
      default: return <Info className="w-4 h-4 text-primary" />;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'alert': return 'destructive';
      case 'success': return 'default';
      case 'warning': return 'secondary';
      default: return 'outline';
    }
  };

  const copyTransactionId = (transactionId: string) => {
    navigator.clipboard.writeText(transactionId);
    toast({
      title: "Transaction ID Copied",
      description: "Copied to clipboard for verification",
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Filter notifications for user's area
  const userNotifications = notifications.filter(notif => 
    notif.municipality === municipality && 
    (!notif.ward || notif.ward === ward)
  );

  const unreadCount = userNotifications.filter(notif => !notif.read).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="rounded-full">
              {unreadCount}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {municipality} • {ward}
        </p>
      </div>

      {userNotifications.length === 0 ? (
        <Card className="text-center p-8">
          <div className="flex flex-col items-center gap-4">
            <Bell className="w-12 h-12 text-muted-foreground/50" />
            <div>
              <h3 className="font-medium text-lg mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                You'll receive updates about votes, service disruptions, and community news here.
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {userNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`transition-all duration-200 ${
                !notification.read 
                  ? 'bg-primary/5 border-primary/20 shadow-civic' 
                  : 'bg-background'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    {getIcon(notification.type)}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                        <Badge variant={getBadgeVariant(notification.type)}>
                          {notification.type}
                        </Badge>
                        {!notification.read && (
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.timestamp}
                        {notification.ward && ` • ${notification.ward}`}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeNotification(notification.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardDescription className="text-base leading-relaxed mb-4">
                  {notification.message}
                </CardDescription>
                
                <div className="flex items-center gap-2">
                  {notification.transactionId && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyTransactionId(notification.transactionId!)}
                      className="gap-2"
                    >
                      <Copy className="w-3 h-3" />
                      Copy Transaction ID
                    </Button>
                  )}
                  
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="text-primary hover:text-primary"
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
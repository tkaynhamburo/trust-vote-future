import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Heart,
  ExternalLink 
} from "lucide-react";

interface EngagementItem {
  id: string;
  type: 'discussion' | 'proposal' | 'issue' | 'event';
  title: string;
  description: string;
  author: string;
  location?: string;
  timestamp: string;
  engagement: {
    likes: number;
    comments: number;
    participants: number;
  };
  status: 'active' | 'pending' | 'resolved';
  priority?: 'high' | 'medium' | 'low';
}

const mockEngagementData: EngagementItem[] = [
  {
    id: '1',
    type: 'proposal',
    title: 'Improve Public Transportation Routes',
    description: 'Community proposal to optimize bus routes in Ward 23 for better accessibility.',
    author: 'Sarah M.',
    location: 'Ward 23, Cape Town',
    timestamp: '2 hours ago',
    engagement: { likes: 34, comments: 12, participants: 156 },
    status: 'active',
    priority: 'high'
  },
  {
    id: '2',
    type: 'issue',
    title: 'Street Light Outages on Mandela Street',
    description: 'Multiple street lights have been out for weeks, creating safety concerns.',
    author: 'Community Reporter',
    location: 'Mandela Street',
    timestamp: '5 hours ago',
    engagement: { likes: 28, comments: 8, participants: 45 },
    status: 'pending',
    priority: 'high'
  },
  {
    id: '3',
    type: 'event',
    title: 'Digital Democracy Workshop',
    description: 'Learn how to use CivicLink and participate in digital governance.',
    author: 'CivicLink Team',
    location: 'Community Hall',
    timestamp: 'Tomorrow 10:00',
    engagement: { likes: 67, comments: 23, participants: 89 },
    status: 'active'
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'discussion': return MessageSquare;
    case 'proposal': return TrendingUp;
    case 'issue': return MapPin;
    case 'event': return Clock;
    default: return MessageSquare;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'discussion': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'proposal': return 'bg-green-100 text-green-700 border-green-200';
    case 'issue': return 'bg-red-100 text-red-700 border-red-200';
    case 'event': return 'bg-purple-100 text-purple-700 border-purple-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'high': return 'bg-red-500';
    case 'medium': return 'bg-yellow-500';
    case 'low': return 'bg-green-500';
    default: return 'bg-gray-400';
  }
};

export const EngagementHub = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Civic Engagement Hub</h2>
        <p className="text-muted-foreground">
          Participate in ongoing discussions, propose ideas, and help shape your community
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button variant="civic" className="h-16 flex-col gap-1">
          <MessageSquare className="w-5 h-5" />
          <span className="text-sm">Start Discussion</span>
        </Button>
        <Button variant="outline" className="h-16 flex-col gap-1">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm">Make Proposal</span>
        </Button>
        <Button variant="outline" className="h-16 flex-col gap-1">
          <MapPin className="w-5 h-5" />
          <span className="text-sm">Report Issue</span>
        </Button>
        <Button variant="outline" className="h-16 flex-col gap-1">
          <Clock className="w-5 h-5" />
          <span className="text-sm">Join Event</span>
        </Button>
      </div>

      {/* Engagement Feed */}
      <div className="space-y-4">
        {mockEngagementData.map((item) => {
          const IconComponent = getTypeIcon(item.type);
          
          return (
            <Card key={item.id} className="hover:shadow-civic transition-all duration-300 animate-fade-in-up">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg border ${getTypeColor(item.type)}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        {item.priority && (
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)}`} />
                        )}
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>by {item.author}</span>
                        {item.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </span>
                        )}
                        <span>{item.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                    {item.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{item.engagement.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{item.engagement.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{item.engagement.participants}</span>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="gap-1">
                    View Details
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">
          Load More Discussions
        </Button>
      </div>
    </div>
  );
};
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Settings, Trash2, Crown, BarChart3 } from "lucide-react";

interface VotingAgenda {
  id: string;
  title: string;
  description: string;
  options: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  timeRemaining: string;
  active: boolean;
  createdAt: string;
}

export const AdminPanel = () => {
  const [agendas, setAgendas] = useState<VotingAgenda[]>([]);
  const [newAgenda, setNewAgenda] = useState({
    title: "",
    description: "",
    options: [{ title: "", description: "", icon: "🗳️" }]
  });
  const { toast } = useToast();

  useEffect(() => {
    // Load agendas from localStorage
    const stored = localStorage.getItem("civiclink_agendas");
    if (stored) {
      setAgendas(JSON.parse(stored));
    }
  }, []);

  const saveAgendas = (updatedAgendas: VotingAgenda[]) => {
    localStorage.setItem("civiclink_agendas", JSON.stringify(updatedAgendas));
    setAgendas(updatedAgendas);
  };

  const addOption = () => {
    setNewAgenda({
      ...newAgenda,
      options: [...newAgenda.options, { title: "", description: "", icon: "🗳️" }]
    });
  };

  const updateOption = (index: number, field: string, value: string) => {
    const updatedOptions = [...newAgenda.options];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    setNewAgenda({ ...newAgenda, options: updatedOptions });
  };

  const removeOption = (index: number) => {
    if (newAgenda.options.length > 1) {
      const updatedOptions = newAgenda.options.filter((_, i) => i !== index);
      setNewAgenda({ ...newAgenda, options: updatedOptions });
    }
  };

  const createAgenda = () => {
    if (!newAgenda.title.trim() || !newAgenda.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in title and description",
        variant: "destructive"
      });
      return;
    }

    const agenda: VotingAgenda = {
      id: Date.now().toString(),
      title: newAgenda.title,
      description: newAgenda.description,
      options: newAgenda.options.map((opt, idx) => ({
        ...opt,
        id: `opt_${idx}`,
        title: opt.title || `Option ${idx + 1}`,
        description: opt.description || "No description provided"
      })),
      timeRemaining: "30 days remaining",
      active: true,
      createdAt: new Date().toISOString()
    };

    const updatedAgendas = [...agendas, agenda];
    saveAgendas(updatedAgendas);
    
    setNewAgenda({
      title: "",
      description: "",
      options: [{ title: "", description: "", icon: "🗳️" }]
    });

    toast({
      title: "Voting agenda created",
      description: "New agenda is now live for community voting"
    });
  };

  const toggleAgendaStatus = (id: string) => {
    const updatedAgendas = agendas.map(agenda =>
      agenda.id === id ? { ...agenda, active: !agenda.active } : agenda
    );
    saveAgendas(updatedAgendas);
    
    toast({
      title: "Agenda status updated",
      description: "Voting agenda status has been changed"
    });
  };

  const deleteAgenda = (id: string) => {
    const updatedAgendas = agendas.filter(agenda => agenda.id !== id);
    saveAgendas(updatedAgendas);
    
    toast({
      title: "Agenda deleted",
      description: "Voting agenda has been permanently removed"
    });
  };

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <Card className="bg-gradient-ethereum text-white shadow-ethereum">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8" />
            <div>
              <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
              <CardDescription className="text-white/80">
                Manage voting agendas and platform settings
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{agendas.length}</div>
            <p className="text-sm text-muted-foreground">Total Agendas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Settings className="w-8 h-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold">{agendas.filter(a => a.active).length}</div>
            <p className="text-sm text-muted-foreground">Active Votes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Crown className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">∞</div>
            <p className="text-sm text-muted-foreground">Admin Power</p>
          </CardContent>
        </Card>
      </div>

      {/* Create New Agenda */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Voting Agenda
          </CardTitle>
          <CardDescription>
            Add a new item for community voting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              placeholder="e.g. Community Budget Allocation 2024"
              value={newAgenda.title}
              onChange={(e) => setNewAgenda({...newAgenda, title: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Describe what this vote is about..."
              value={newAgenda.description}
              onChange={(e) => setNewAgenda({...newAgenda, description: e.target.value})}
            />
          </div>

          <div className="space-y-3">
            <Label>Voting Options</Label>
            {newAgenda.options.map((option, index) => (
              <Card key={index} className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <Input
                    placeholder="Option title"
                    value={option.title}
                    onChange={(e) => updateOption(index, "title", e.target.value)}
                  />
                  <Input
                    placeholder="Icon (emoji)"
                    value={option.icon}
                    onChange={(e) => updateOption(index, "icon", e.target.value)}
                    className="text-center"
                  />
                  <Input
                    placeholder="Description"
                    value={option.description}
                    onChange={(e) => updateOption(index, "description", e.target.value)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeOption(index)}
                    disabled={newAgenda.options.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
            
            <Button variant="outline" onClick={addOption} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Option
            </Button>
          </div>

          <Button onClick={createAgenda} className="w-full" size="lg">
            Create Voting Agenda
          </Button>
        </CardContent>
      </Card>

      {/* Existing Agendas */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Existing Agendas</CardTitle>
          <CardDescription>Control active voting sessions</CardDescription>
        </CardHeader>
        <CardContent>
          {agendas.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No voting agendas created yet
            </p>
          ) : (
            <div className="space-y-4">
              {agendas.map((agenda) => (
                <Card key={agenda.id} className={agenda.active ? "border-primary" : "border-muted"}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{agenda.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{agenda.description}</p>
                        <div className="flex gap-2 text-xs">
                          <span className={`px-2 py-1 rounded ${agenda.active ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}`}>
                            {agenda.active ? 'Active' : 'Inactive'}
                          </span>
                          <span className="px-2 py-1 bg-muted text-muted-foreground rounded">
                            {agenda.options.length} options
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleAgendaStatus(agenda.id)}
                        >
                          {agenda.active ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteAgenda(agenda.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

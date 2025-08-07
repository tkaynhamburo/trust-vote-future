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
  type: "provincial" | "municipal";
  municipality: string;
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
    type: "municipal" as "provincial" | "municipal",
    municipality: "City of Cape Town",
    options: [{ title: "", description: "", icon: "🗳️" }]
  });

  // Western Cape Municipalities
  const municipalities = [
    "Western Cape Province", "City of Cape Town", "Stellenbosch", "Drakenstein", 
    "Witzenberg", "Breede Valley", "Langeberg", "Swellendam", "Theewaterskloof",
    "Overstrand", "Cape Agulhas", "Swartland", "Saldanha Bay", "Bergrivier", 
    "Cederberg", "Matzikama", "Bitou", "Knysna", "George", "Hessequa", 
    "Oudtshoorn", "Kannaland", "Laingsburg", "Prince Albert", "Beaufort West"
  ];
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
      type: newAgenda.type,
      municipality: newAgenda.municipality,
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
      type: "municipal",
      municipality: "City of Cape Town",
      options: [{ title: "", description: "", icon: "🗳️" }]
    });

    toast({
      title: "Voting agenda created",
      description: `New ${newAgenda.type} agenda is now live for community voting`
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
                Manage Western Cape provincial and municipal voting agendas
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
            Create provincial or municipal voting agenda for Western Cape communities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Voting Type</Label>
              <select 
                className="w-full p-2 rounded-md border border-input bg-background"
                value={newAgenda.type}
                onChange={(e) => setNewAgenda({...newAgenda, type: e.target.value as "provincial" | "municipal"})}
              >
                <option value="municipal">Municipal (Local)</option>
                <option value="provincial">Provincial (Western Cape)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>Municipality/Area</Label>
              <select 
                className="w-full p-2 rounded-md border border-input bg-background"
                value={newAgenda.municipality}
                onChange={(e) => setNewAgenda({...newAgenda, municipality: e.target.value})}
              >
                {municipalities.map(muni => (
                  <option key={muni} value={muni}>{muni}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              placeholder="e.g. Housing Development Budget R15 Million - Ward 23"
              value={newAgenda.title}
              onChange={(e) => setNewAgenda({...newAgenda, title: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Describe the community issue and budget allocation..."
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
                        <div className="flex gap-2 text-xs mb-2">
                          <span className={`px-2 py-1 rounded ${agenda.active ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}`}>
                            {agenda.active ? 'Active' : 'Inactive'}
                          </span>
                          <span className={`px-2 py-1 rounded ${agenda.type === 'provincial' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                            {agenda.type === 'provincial' ? 'Provincial' : 'Municipal'}
                          </span>
                          <span className="px-2 py-1 bg-muted text-muted-foreground rounded">
                            {agenda.options.length} options
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{agenda.municipality}</p>
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

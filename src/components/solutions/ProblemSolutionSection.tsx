import { AlertCircle, CheckCircle2 } from "lucide-react";

interface Problem {
  text: string;
}

interface Solution {
  text: string;
}

interface ProblemSolutionSectionProps {
  problems: Problem[];
  solutions: Solution[];
}

const ProblemSolutionSection = ({ problems, solutions }: ProblemSolutionSectionProps) => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Problems */}
            <div>
              <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-6">
                <AlertCircle className="h-4 w-4" />
                Utan Boost08
              </div>
              <h2 className="text-3xl font-bold mb-8">Vanliga Utmaningar</h2>
              <div className="space-y-4">
                {problems.map((problem, index) => (
                  <div key={index} className="flex gap-3 p-4 bg-background rounded-lg border border-border">
                    <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{problem.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div>
              <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
                <CheckCircle2 className="h-4 w-4" />
                Med Boost08
              </div>
              <h2 className="text-3xl font-bold mb-8">Hur Vi Löser Det</h2>
              <div className="space-y-4">
                {solutions.map((solution, index) => (
                  <div key={index} className="flex gap-3 p-4 bg-background rounded-lg border border-border">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <p className="text-foreground">{solution.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;

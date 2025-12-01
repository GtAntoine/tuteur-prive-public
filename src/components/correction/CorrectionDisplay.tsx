import React from 'react';
import { DetailedResponse } from './DetailedResponse';
import { ElementsList } from './ElementsList';
import { ImprovementSuggestions } from './ImprovementSuggestions';
import { Appreciation } from './Appreciation';
import type { CorrectionResponse } from '../../lib/types';

interface CorrectionDisplayProps {
  data: CorrectionResponse;
  historyId?: string;
}

export function CorrectionDisplay({ data, historyId }: CorrectionDisplayProps) {
  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">Évaluation détaillée</h2>
        {data.evaluation_detailed_responses.map((response, index) => (
          <DetailedResponse key={index} {...response} />
        ))}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ElementsList 
          elements={data.elements_corrects} 
          type="correct" 
        />
        <ElementsList 
          elements={data.elements_incorrects_or_incompletes} 
          type="incorrect" 
        />
      </div>

      <ImprovementSuggestions 
        suggestions={data.specific_improvement_suggestions} 
      />

      <Appreciation message={data.general_appreciation} />
    </div>
  );
}
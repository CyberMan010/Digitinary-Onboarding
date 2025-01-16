import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DescriptionProps {
  requirements: string;
  implementationGuide: string;
}

export function Description({ requirements, implementationGuide }: DescriptionProps) {
  return (
    <div className="mt-6">
      <Tabs defaultValue="requirements">
        <TabsList>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="implementation">Implementation Guide</TabsTrigger>
        </TabsList>
        <TabsContent value="requirements">
          <div className="p-4 bg-white rounded-lg shadow">
            <p>{requirements}</p>
          </div>
        </TabsContent>
        <TabsContent value="implementation">
          <div className="p-4 bg-white rounded-lg shadow">
            <p>{implementationGuide}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}


import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import SuspenseBoundary from '../../../_sharedComponents/SuspenseBoundary/SuspenseBoundary';
import SkeletonRows from './SkeletonRows';

type ExplorerAccordionPropTypes = {
  id?: string;
  title: JSX.Element | string;
  content: JSX.Element;
  expanded?: boolean;
  onChange?: AccordionProps['onChange'];
  className?: string;
  expandIcon?: React.ReactNode;
};

const slug = (input: string): string =>
  input.replace(' ', '_').replace(/[^A-Za-z0-9\s]/g, '');
const randomSlug = () => (Math.random() + 1).toString(36).substring(7);

function ExplorerAccordion({
  id: customId,
  title,
  content,
  expanded = false,
  onChange,
  className,
  expandIcon,
}: ExplorerAccordionPropTypes) {
  const [accordionState, setAccordionState] = useState({
    expanded,
    wasExpanded: expanded,
  });
  const id =
    customId ?? (typeof title === 'string' ? slug(title) : randomSlug());
  const currentlyExpanded = onChange ? expanded : accordionState.expanded;

  return (
    <Accordion
      className={className}
      expanded={currentlyExpanded}
      onChange={(e, isExpanded) => {
        setAccordionState({
          expanded: isExpanded,
          wasExpanded: accordionState.wasExpanded || isExpanded,
        });
        if (onChange) {
          onChange(e, isExpanded);
        }
      }}
    >
      <AccordionSummary
        expandIcon={expandIcon || <ExpandMoreIcon />}
        aria-controls={`${id}-content`}
        aria-label={typeof title === 'string' ? title : 'Accordion Title'}
        id={`${id}-header`}
      >
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom={false}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails aria-labelledby={`${id}-header`} id={`${id}-content`}>
        <SuspenseBoundary
          content={content}
          loading={<SkeletonRows />}
          error={null}
          shouldRender={accordionState.wasExpanded}
        />
      </AccordionDetails>
    </Accordion>
  );
}

export default ExplorerAccordion;

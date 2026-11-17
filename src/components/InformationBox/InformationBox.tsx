import { ChevronDown } from "lucide-react";
import "./InformationBox.css";

interface InformationBoxProps {
  title: string;
  items: readonly string[];
  description?: string;
  number?: string;
  groupName?: string;
  initiallyOpen?: boolean;
  example?: {
    label: string;
    text: string;
  };
}

export function InformationBox({
  title,
  items,
  description,
  number,
  groupName,
  initiallyOpen = false,
  example,
}: InformationBoxProps) {
  return (
    <details className="info-box" name={groupName} open={initiallyOpen}>
      <summary className="info-box__summary">
        {number && <span className="info-box__number" aria-hidden="true">{number}</span>}
        <span className="info-box__heading">
          <span className="info-box__title">{title}</span>
          {description && <span className="info-box__description">{description}</span>}
        </span>
        <ChevronDown className="info-box__chevron" size={18} aria-hidden="true" />
      </summary>

      <div className="info-box__content">
        <ul>
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
        {example && (
          <div className="info-box__example">
            <p className="info-box__example-label">{example.label}</p>
            <p>{example.text}</p>
          </div>
        )}
      </div>
    </details>
  );
}

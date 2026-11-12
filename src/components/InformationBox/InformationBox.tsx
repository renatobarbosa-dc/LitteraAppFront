import "./InformationBox.css";

interface InformationBoxProps {
  title: string;
  items: string[];
}

export function InformationBox({ title, items }: InformationBoxProps) {
  return (
    <div className="info-box">
      <h3>{title}</h3>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
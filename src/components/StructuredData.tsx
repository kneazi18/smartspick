import { FC } from 'react';

interface StructuredDataProps {
  data: object | object[];
}

const StructuredData: FC<StructuredDataProps> = ({ data }) => {
  const jsonLd = Array.isArray(data) ? data : [data];
  
  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item, null, 2)
          }}
        />
      ))}
    </>
  );
};

export default StructuredData;
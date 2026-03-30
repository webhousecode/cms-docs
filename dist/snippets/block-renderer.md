# Block renderer

*Updated: 2026-03-30*

function BlockRenderer({ block }: { block: any }) {
  switch (block._block) {
    case 'hero':
      return (
        
          {block.tagline}
          {block.description}
        
      );
    case 'features':
      return (
        
          {block.title}
          
            {block.items?.map((item: any, i: number) => (
              
                {item.title}
                {item.description}
              
            ))}
          
        
      );
    default:
      return null;
  }
}
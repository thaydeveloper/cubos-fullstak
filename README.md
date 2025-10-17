# Estrutura do Projeto - Container/Presentation Pattern

## 📁 Organização das Pastas

### `/components` - Presentation Layer
Componentes puros que recebem props e renderizam UI. **Não contêm lógica de negócio**.

- **`/ui`** - Componentes de interface básicos (Button, Input, Card, Modal, etc.)
- **`/layout`** - Componentes de estrutura (Header, Footer, Sidebar, Layouts)
- **`/forms`** - Componentes de formulário puros (LoginForm, MovieForm, etc.)

### `/containers` - Container Layer
Componentes que lidam com **lógica de negócio, estado e side effects**.

- Fazem chamadas para APIs
- Gerenciam estado local
- Conectam com stores globais
- Passam dados para componentes de apresentação

### `/pages`
Páginas da aplicação que combinam containers e components.

### `/hooks`
Custom hooks para lógica reutilizável.

### `/store`
Gerenciamento de estado global (Zustand).

### `/services`
Serviços para comunicação com APIs.

### `/types`
Definições de tipos TypeScript.

### `/utils`
Funções utilitárias.

### `/assets`
Recursos estáticos (imagens, ícones).

## 🏗️ Padrão Container/Presentation

### Presentation Components (Dumb Components)
```tsx
// ✅ Componente de apresentação
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      className={cn('btn', `btn-${variant}`)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Container Components (Smart Components)
```tsx
// ✅ Container component
export default function LoginContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  
  const handleLogin = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await login(data);
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginForm 
      onSubmit={handleLogin}
      isLoading={isLoading}
    />
  );
}
```

## 📋 Responsabilidades

### Presentation Components
- ✅ Renderizar UI baseada em props
- ✅ Lidar com eventos de UI (onClick, onChange)
- ✅ Aplicar estilos e classes CSS
- ❌ Fazer chamadas de API
- ❌ Gerenciar estado complexo
- ❌ Conter lógica de negócio

### Container Components
- ✅ Gerenciar estado da aplicação
- ✅ Fazer chamadas de API
- ✅ Implementar lógica de negócio
- ✅ Conectar com stores globais
- ✅ Lidar com side effects
- ❌ Renderizar UI complexa
- ❌ Aplicar estilos diretamente

## 🎯 Benefícios

1. **Separação de responsabilidades** - UI separada da lógica
2. **Reutilização** - Componentes de apresentação podem ser reutilizados
3. **Testabilidade** - Mais fácil testar lógica e UI separadamente
4. **Manutenibilidade** - Mudanças na UI não afetam a lógica e vice-versa
5. **Legibilidade** - Código mais organizado e fácil de entender
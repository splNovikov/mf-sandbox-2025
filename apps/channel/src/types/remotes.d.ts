declare module 'widget/Widget' {
    interface WidgetProps {
        title?: string;
        theme?: 'light' | 'dark';
    }
    
    const Widget: React.ComponentType<WidgetProps>;
    export default Widget;
} 
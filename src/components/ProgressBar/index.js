import { React } from 'src/vendor';

export const ProgressBar = ({ total = 100, completed = 0 }) => {
    const width = `${100 * completed / total}%`;
    const transition = 'width 0.7s ease';

    return (
        <div className="progress-bar">
            <div className="progress-bar__fill" style={{ width, transition }} />
        </div>
    );
};

export default ProgressBar;

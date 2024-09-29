import { RWebShare } from "react-web-share";

const ShareButton = ({ title, text, url }: { title: string, text: string, url: string }) => {
    return (
        <RWebShare
            data={{
                text: text,
                title: title,
                url: url,
            }}
        >
            <button className="p-2 bg-blue-500 text-white rounded">Share</button>
        </RWebShare>
    );
};

export default ShareButton;

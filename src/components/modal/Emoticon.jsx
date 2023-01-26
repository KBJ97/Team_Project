import Picker from "emoji-picker-react";

const Emoticon = (props) => {
  const onEmojiClick = (event, emojiData) => {
    props.setText((prevText) => prevText + emojiData.emoji);
  };
  return (
    <div style={{ display: props.icon ? "block" : "none" }}>
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
};
export default Emoticon;

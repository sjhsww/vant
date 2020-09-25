import { computed } from 'vue';
import { createNamespace, isDef } from '../utils';
import Badge from '../badge';

const [createComponent, bem] = createNamespace('tab');

export default createComponent({
  props: {
    dot: Boolean,
    type: String,
    color: String,
    title: String,
    badge: [Number, String],
    isActive: Boolean,
    disabled: Boolean,
    scrollable: Boolean,
    activeColor: String,
    renderTitle: Function,
    inactiveColor: String,
  },

  setup(props) {
    const style = computed(() => {
      const style: Record<string, string> = {};
      const {
        type,
        color,
        disabled,
        isActive,
        activeColor,
        inactiveColor,
      } = props;

      const isCard = type === 'card';

      // card theme color
      if (color && isCard) {
        style.borderColor = color;

        if (!disabled) {
          if (isActive) {
            style.backgroundColor = color;
          } else {
            style.color = color;
          }
        }
      }

      const titleColor = isActive ? activeColor : inactiveColor;
      if (titleColor) {
        style.color = titleColor;
      }

      return style;
    });

    const renderText = () => {
      const Text = (
        <span class={bem('text', { ellipsis: !props.scrollable })}>
          {props.renderTitle ? props.renderTitle() : props.title}
        </span>
      );

      if (props.dot || (isDef(props.badge) && props.badge !== '')) {
        return (
          <span class={bem('text-wrapper')}>
            {Text}
            {<Badge dot={props.dot} badge={props.badge} />}
          </span>
        );
      }

      return Text;
    };

    return () => (
      <div
        role="tab"
        class={[
          bem({
            active: props.isActive,
            disabled: props.disabled,
          }),
        ]}
        style={style.value}
        aria-selected={props.isActive}
      >
        {renderText()}
      </div>
    );
  },
});
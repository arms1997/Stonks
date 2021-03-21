import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import NewsContainer from "../components/Graph/NewsContainer";

storiesOf("NewContainer", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Empty Container", () => <NewsContainer></NewsContainer>);

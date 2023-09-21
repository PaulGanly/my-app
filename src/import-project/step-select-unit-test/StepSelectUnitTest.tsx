import React, {useState} from "react";
import {
    Button,
    GridCol,
    GridRow, IconButton, IconEdit,
    LoadingSpinner,
    ModalBody,
    ModalFooter, Toggle
} from "@lmig/lmds-react";
import './StepSelectUnitTest.css';
import {Highlight, themes} from "prism-react-renderer";

export function StepSelectUnitTest(props: any) {
    const [isHide, setIsHide] = useState(true);

    setTimeout(() => setIsHide(false), 5000);

    const codeBlock = `
    public addNumbers(a: number, b: number): number {
        const value = a + b;
        if(value < 0) {
            return 0;
        } else {
            return value > 99 ? 100 : value;
         }   
    }
    `

    const testBlock = `
    describe("addNumbers", () => {
      const testCases = [
        // Valid scenarios
        { a: 0, b: 0, expected: 0 },
        { a: 50, b: 49, expected: 99 },
        { a: 50, b: 50, expected: 100 },
        { a: 99, b: 0, expected: 99 },
        { a: 0, b: 99, expected: 99 },
        { a: 10, b: 20, expected: 30 },
        // Invalid scenarios
        { a: Number.MIN_VALUE, b: Number.MIN_VALUE, expected: 0 },
        { a: Number.MAX_VALUE, b: Number.MAX_VALUE, expected: 0 },
        { a: Number.MIN_VALUE - 1, b: Number.MIN_VALUE - 1, expected: 0 },
        { a: Number.MAX_VALUE + 1, b: Number.MAX_VALUE + 1, expected: 0 },
        { a: -50, b: -50, expected: 0 },
        { a: 50, b: 51, expected: 100 },
        { a: Number.MAX_VALUE, b: Number.MAX_VALUE + 1, expected: 100 },
        { a: Number.MIN_VALUE, b: Number.MIN_VALUE - 1, expected: 0 },
        { a: -50, b: 50, expected: 0 },
        { a: 50, b: -50, expected: 0 },
      ];
    
      test.each(testCases)(
        "given %p and %p as input, returns %p",
        ({ a, b, expected }) => {
          expect(addNumbers(a, b)).toBe(expected);
        }
      );
    });
    `

    return (<div>
        <ModalBody>
            <h2>Generating test code for class: <b>com.lmig.AddNumbers</b></h2>
            <h4>Testing this method:</h4>
            <Highlight
                theme={themes.github}
                code={codeBlock}
                language="ts"
            >
                {({className, style, tokens, getLineProps, getTokenProps}) => (
                    <pre style={style}>
                            {tokens.map((line, i) => (
                                <div key={i} {...getLineProps({line})}>
                                    <span>{i + 1}</span>
                                    {line.map((token, key) => (
                                        <span key={key} {...getTokenProps({token})} />
                                    ))}
                                </div>
                            ))}
                          </pre>
                )}
            </Highlight>

            {!isHide ? <div>
                <h4>Generated tests:</h4>
                <GridRow>
                    <GridCol base={11}>
                        <Highlight
                            theme={themes.github}
                            code={testBlock}
                            language="ts"
                        >
                            {({className, style, tokens, getLineProps, getTokenProps}) => (
                                <pre style={style}>
                                {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({line})}>
                                        <span>{i + 1}</span>
                                        {line.map((token, key) => (
                                            <span key={key} {...getTokenProps({token})} />
                                        ))}
                                    </div>
                                ))}
                              </pre>
                            )}
                        </Highlight>
                    </GridCol>
                    <GridCol className={'edit-col'} base={1}>
                        <IconButton hasOutline>
                            <IconEdit label="Edit"/>
                        </IconButton>
                    </GridCol>


                </GridRow>
                <GridRow>
                    <GridCol base={8}></GridCol>
                    <GridCol base={4}><Toggle defaultChecked dynamicWidth showOnOff={false}
                                              labelVisual="Add to test suite"/></GridCol>
                </GridRow>
            </div> : <div className={'loading-container'}><LoadingSpinner className={'loading-spinner'} color="blue"
                                                                          hiddenTrack size="64"/><h2
                className={'loading-text'}>Contacting Liberty GPT...</h2></div>}
        </ModalBody>
        <ModalFooter>
            <GridRow gutterSize="fixed-16" gutters>
                <GridCol base={6}>
                    <Button dynamicWidth onClick={() => props.previousStep()}>
                        Back
                    </Button>
                </GridCol>
                <GridCol base={6}>
                    <Button dynamicWidth variant="primary" onClick={() => props.goToStep(5)}>
                        Continue
                    </Button>
                </GridCol>
            </GridRow>
        </ModalFooter>
    </div>);
}
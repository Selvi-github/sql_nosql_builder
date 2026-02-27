import React, { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly";
import "blockly/javascript";
import { javascriptGenerator } from "blockly/javascript";
import { sqlDefinitions } from "../../blocks/sql/definitions";
import { nosqlDefinitions } from "../../blocks/nosql/definitions";
import { sqlGenerators } from "../../blocks/sql/generators";
import { nosqlGenerators } from "../../blocks/nosql/generators";

const BlocklyEditor = ({ initialXml, onCodeChange, category = "SQL", readOnly = false, uiTheme = "light" }) => {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(category);
  const isLight = uiTheme !== 'dark';

  // Update internal category when prop changes
  useEffect(() => {
    setActiveCategory(category);
  }, [category]);

  // Initialize Blockly
  useEffect(() => {
    // Define all blocks from external modules
    if (!Blockly.Blocks['sql_create_table']) {
      Blockly.defineBlocksWithJsonArray([...sqlDefinitions, ...nosqlDefinitions]);
    }

    // Register all generators using the modular pattern
    const allGenerators = {
      ...sqlGenerators(javascriptGenerator),
      ...nosqlGenerators(javascriptGenerator)
    };

    Object.keys(allGenerators).forEach(blockType => {
      javascriptGenerator.forBlock[blockType] = allGenerators[blockType];
    });

    // Initialize workspace
    if (blocklyDiv.current) {
      if (!Blockly.Themes.CalmLight) {
        Blockly.Themes.CalmLight = Blockly.Theme.defineTheme('CalmLight', {
          base: Blockly.Themes.Classic,
          componentStyles: {
            workspaceBackgroundColour: '#ffffff',
            toolboxBackgroundColour: '#f8fafc',
            toolboxForegroundColour: '#0f172a',
            flyoutBackgroundColour: '#f1f5f9',
            flyoutForegroundColour: '#0f172a',
            flyoutOpacity: 0.98,
            scrollbarColour: '#cbd5e1',
            insertionMarkerColour: '#2563eb',
            insertionMarkerOpacity: 0.2
          },
          fontStyle: {
            family: 'Inter, Arial, sans-serif',
            size: 12
          }
        });
      }

      const blocklyTheme = isLight ? Blockly.Themes.CalmLight : Blockly.Themes.Dark;

      workspaceRef.current = Blockly.inject(blocklyDiv.current, {
        toolbox: getToolboxXML(),
        theme: blocklyTheme,
        scrollbars: true,
        readOnly: readOnly,
        trashcan: true,
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2
        },
        move: {
          scrollbars: {
            horizontal: true,
            vertical: true
          },
          drag: true,
          wheel: true
        },
        grid: {
          spacing: 20,
          length: 3,
          colour: isLight ? '#e2e8f0' : '#334155',
          snap: true
        },
        sounds: false
      });

      // Load initial XML if provided
      if (initialXml) {
        try {
          const xml = Blockly.utils.xml.textToDom(initialXml);
          Blockly.Xml.domToWorkspace(xml, workspaceRef.current);
        } catch (e) {
          console.error("Error loading initial XML", e);
        }
      }

      // Update code when blocks change
      workspaceRef.current.addChangeListener(() => {
        const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
        if (onCodeChange) onCodeChange(code);
      });

      // Force refresh the workspace
      setTimeout(() => {
        if (workspaceRef.current) {
          workspaceRef.current.render();
        }
      }, 100);
    }

    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (workspaceRef.current) {
      const blocklyTheme = isLight ? Blockly.Themes.CalmLight : Blockly.Themes.Dark;
      workspaceRef.current.setTheme(blocklyTheme);
    }
  }, [isLight]);

  // Update toolbox when category changes
  useEffect(() => {
    if (workspaceRef.current) {
      workspaceRef.current.updateToolbox(getToolboxXML());
      // Force re-render after toolbox update
      setTimeout(() => {
        if (workspaceRef.current) {
          workspaceRef.current.render();
        }
      }, 50);
    }
  }, [activeCategory]);

  const getToolboxXML = () => {
    if (activeCategory === "SQL") {
      return `
            <xml xmlns="https://developers.google.com/blockly/xml">
              <category name=" DDL Commands" colour="230">
                <block type="sql_show_tables"></block>
                <block type="sql_desc_table"></block>
                <block type="sql_create_table"></block>
                <block type="sql_alter_table"></block>
                <block type="sql_drop_table"></block>
                <block type="sql_create_view"></block>
                <block type="sql_drop_view"></block>
                <block type="sql_create_sequence"></block>
              </category>
              <category name=" DML Commands" colour="210">
                <block type="sql_select"></block>
                <block type="sql_insert"></block>
                <block type="sql_insert_cols"></block>
                <block type="sql_update"></block>
                <block type="sql_delete"></block>
                <block type="sql_join_cols"></block>
                <block type="sql_join_3_cols"></block>
                <block type="sql_join_4_cols"></block>
                <block type="sql_limit"></block>
                <block type="sql_group"></block>
                <block type="sql_order"></block>
              </category>
              <category name=" Conditions & Logic" colour="210">
                <block type="sql_where"></block>
                <block type="sql_compare"></block>
                <block type="sql_logical"></block>
                <block type="sql_between"></block>
                <block type="sql_in_list"></block>
                <block type="sql_is_null"></block>
                <block type="sql_null_check"></block>
                <block type="sql_function_expression"></block>
                <block type="sql_arithmetic"></block>
                <block type="sql_column"></block>
                <block type="sql_value_string"></block>
                <block type="sql_value_number"></block>
                <block type="sql_value_unquoted"></block>
                <block type="sql_regexp"></block>
                <block type="sql_json_extract"></block>
              </category>
              <category name=" TCL Commands" colour="250">
                <block type="sql_commit"></block>
                <block type="sql_rollback"></block>
                <block type="sql_savepoint"></block>
              </category>
              <category name=" DCL Commands" colour="240">
                <block type="sql_grant"></block>
                <block type="sql_revoke"></block>
              </category>
              <category name=" Advanced SQL" colour="190">
                <block type="sql_select_extended"></block>
                <block type="sql_aggregate"></block>
                <block type="sql_alias"></block>
                <block type="sql_select_alias"></block>
                <block type="sql_case"></block>
                <block type="sql_cte"></block>
                <block type="sql_group_by"></block>
                <block type="sql_order_by"></block>
                <block type="sql_having"></block>
                <block type="sql_subquery"></block>
                <block type="sql_subquery_nested"></block>
                <block type="sql_group_rollup"></block>
                <block type="sql_window_func"></block>
                <block type="sql_window_over"></block>
                <block type="sql_window_rows"></block>
              </category>
              <category name=" JOIN Operations" colour="170">
                <block type="sql_join"></block>
                <block type="sql_inner_join"></block>
                <block type="sql_left_join"></block>
                <block type="sql_right_join"></block>
              </category>
              <category name=" String Functions" colour="130">
                <block type="sql_string_select_ucase"></block>
                <block type="sql_string_select_lcase"></block>
                <block type="sql_string_select_concat"></block>
                <block type="sql_string_select_concat_ws"></block>
                <block type="sql_string_select_length"></block>
                <block type="sql_string_select_char_length"></block>
                <block type="sql_string_select_substring"></block>
                <block type="sql_string_select_left"></block>
                <block type="sql_string_select_right"></block>
                <block type="sql_string_select_trim"></block>
                <block type="sql_string_select_replace"></block>
                <block type="sql_string_select_reverse"></block>
                <block type="sql_string_select_position"></block>
                <block type="sql_string_select_locate"></block>
                <block type="sql_string_select_lpad"></block>
                <block type="sql_string_select_rpad"></block>
                <block type="sql_string_select_repeat"></block>
                <block type="sql_string_select_ascii"></block>
                <block type="sql_string_select_substring_index"></block>
                <block type="sql_string_select_mid"></block>
              </category>
              <category name=" Math Functions" colour="230">
                <block type="sql_arithmetic"></block>
                <block type="sql_math_abs"></block>
                <block type="sql_math_round"></block>
                <block type="sql_math_ceil"></block>
                <block type="sql_math_floor"></block>
                <block type="sql_math_sqrt"></block>
                <block type="sql_math_pow"></block>
                <block type="sql_math_rand"></block>
                <block type="sql_math_sign"></block>
                <block type="sql_math_truncate"></block>
              </category>
              <category name=" Date Functions" colour="140">
                 <block type="sql_date_select_now"></block>
                 <block type="sql_date_select_curdate"></block>
                 <block type="sql_date_select_curtime"></block>
                 <block type="sql_date_select_format"></block>
                 <block type="sql_date_select_datediff"></block>
                 <block type="sql_date_select_dayname"></block>
                 <block type="sql_date_select_monthname"></block>
                 <block type="sql_date_select_year"></block>
                 <block type="sql_date_select_month"></block>
                 <block type="sql_date_select_day"></block>
                 <block type="sql_date_date"></block>
                 <block type="sql_date_add"></block>
                 <block type="sql_date_sub"></block>
                 <block type="sql_timestampdiff"></block>
                 <block type="sql_str_to_date"></block>
                 <block type="sql_unix_timestamp"></block>
                 <block type="sql_from_unixtime"></block>
                 <block type="sql_date_month_field"></block>
                 <block type="sql_date_dayofweek_field"></block>
                 <block type="sql_date_hour_field"></block>
              </category>
              <category name=" Procedures & Functions" colour="160">
                <block type="sql_create_procedure"></block>
                <block type="sql_execute_procedure"></block>
                <block type="sql_create_function"></block>
              </category>
              <category name=" Triggers" colour="150">
                <block type="sql_create_trigger"></block>
              </category>
            </xml>
          `;
    } else {
      // Default to NoSQL for any other category value
      return `
            <xml xmlns="https://developers.google.com/blockly/xml">
              <category name=" CRUD Operations" colour="120">
                <block type="nosql_find"></block>
                <block type="nosql_insert"></block>
                <block type="nosql_update"></block>
                <block type="nosql_delete"></block>
                <block type="nosql_find_one"></block>
              </category>
              <category name=" Query Options" colour="110">
                <block type="nosql_sort"></block>
                <block type="nosql_project"></block>
                <block type="nosql_limit"></block>
                <block type="nosql_skip"></block>
                <block type="nosql_find_skip_limit"></block>
                <block type="nosql_count"></block>
                <block type="nosql_count_documents"></block>
                <block type="nosql_distinct"></block>
              </category>
              <category name=" Aggregation" colour="100">
                <block type="nosql_aggregate"></block>
              </category>
              <category name=" Comparison Operators" colour="90">
                <block type="nosql_comparison"></block>
              </category>
              <category name=" Logical Operators" colour="80">
                <block type="nosql_logical"></block>
                <block type="nosql_expression"></block>
                <block type="nosql_modulo"></block>
                <block type="nosql_field_reference"></block>
                <block type="nosql_expr_arithmetic"></block>
                <block type="nosql_expr_size"></block>
                <block type="nosql_expr_strlen"></block>
                <block type="nosql_number"></block>
                <block type="nosql_string"></block>
              </category>
              <category name=" Element Operators" colour="70">
                <block type="nosql_element"></block>
                <block type="nosql_regex"></block>
              </category>
              <category name="📊 Index Operations" colour="100">
                <block type="nosql_index"></block>
              </category>
              <category name="⚙️ Admin Operations" colour="90">
                <block type="nosql_admin"></block>
                <block type="nosql_db_admin"></block>
              </category>
            </xml>
          `;
    }
  };

  return (
    <div
      ref={blocklyDiv}
      style={{
        height: '100%',
        width: '100%',
        borderRadius: '0 0 12px 12px',
        overflow: 'hidden'
      }}
    />
  );
};

export default BlocklyEditor;
